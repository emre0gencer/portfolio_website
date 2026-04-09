import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/skills";

interface SkillItem {
  name: string;
  proficiency: number;
  category: string;
}

interface Node extends SkillItem {
  x: number;
  y: number;
  baseSize: number;
  currentSize: number;
  currentOpacity: number;
}

interface Edge {
  from: Node;
  to: Node;
}

interface SkillNetworkProps {
  hoveredCategory?: string | null;
  selectedCategory?: string | null;
  onSkillHover?: (name: string | null, category: string | null) => void;
  onCategorySelect?: (category: string | null) => void;
}

// ---------- Color helpers ----------

const parseHsl = (hsl: string) => {
  const m = hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!m) return null;
  return { h: Number(m[1]), s: Number(m[2]), l: Number(m[3]) };
};

const colToRgba = (col: string, a = 1) => {
  const p = parseHsl(col);
  if (!p) {
    return `255,255,255,${a}`;
  }
  const h = p.h / 360;
  const s = p.s / 100;
  const l = p.l / 100;

  const hue2rgb = (p1: number, p2: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p1 + (p2 - p1) * 6 * t;
    if (t < 1 / 2) return p2;
    if (t < 2 / 3) return p1 + (p2 - p1) * (2 / 3 - t) * 6;
    return p1;
  };

  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p2 = 2 * l - q;
    r = hue2rgb(p2, q, h + 1 / 3);
    g = hue2rgb(p2, q, h);
    b = hue2rgb(p2, q, h - 1 / 3);
  }
  return `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
    b * 255
  )},${a}`;
};

const brightenHsl = (hsl: string, deltaL: number) => {
  const p = parseHsl(hsl);
  if (!p) return hsl;
  const l = Math.min(100, p.l + deltaL);
  return `hsl(${p.h} ${p.s}% ${l}%)`;
};

const SkillGlobe = ({
  hoveredCategory,
  selectedCategory,
  onSkillHover,
  onCategorySelect,
}: SkillNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hoverCategoryRef = useRef<string | null>(null);
  const selectedCategoryRef = useRef<string | null>(null);
  const hoverSkillNameRef = useRef<string | null>(null);
  const lastHoverSkillForNotifyRef = useRef<string | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  // keep refs in sync with props so animation loop sees latest state
  useEffect(() => {
    hoverCategoryRef.current = hoveredCategory ?? null;
  }, [hoveredCategory]);

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory ?? null;
  }, [selectedCategory]);

  // Flatten skills
  const allSkills: SkillItem[] = [];
  skills.forEach((cat) => {
    cat.skills.forEach((s) => {
      allSkills.push({
        name: s,
        proficiency: Math.random() * 0.5 + 0.5, // 0.5–1.0
        category: cat.category,
      });
    });
  });

  // Category colors from CSS vars or fallback palette
  const categoryColors: Record<string, string> = {};
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  skills.forEach((cat, idx) => {
    const varName = `--cat-${slugify(cat.category)}`;
    const css =
      typeof window !== "undefined"
        ? getComputedStyle(document.documentElement).getPropertyValue(varName)
        : "";
    categoryColors[cat.category] =
      css?.trim() ||
      [
        "hsl(260 85% 65%)", // a bit brighter by default
        "hsl(220 90% 65%)",
        "hsl(190 85% 62%)",
        "hsl(40 90% 62%)",
      ][idx % 4];
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const isMobile = window.innerWidth < 768;
      canvas.width = isMobile ? 340 : 460;
      canvas.height = isMobile ? 260 : 320;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const width = canvas.width;
    const height = canvas.height;

    // ---------- Layout as a "neural network" (columns per category) ----------
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const numCategories = skills.length;
    const marginX = 40;
    const marginY = 30;
    const innerWidth = width - marginX * 2;
    const innerHeight = height - marginY * 2;

    skills.forEach((cat, catIndex) => {
      const catSkills = allSkills.filter((s) => s.category === cat.category);
      if (catSkills.length === 0) return;

      const columnX =
        marginX + (innerWidth * (catIndex + 0.5)) / numCategories;

      const stepY =
        catSkills.length === 1
          ? 0
          : innerHeight / (catSkills.length - 1 || 1);

      catSkills.forEach((skill, idx) => {
        const baseY =
          catSkills.length === 1 ? innerHeight / 2 : stepY * idx;
        const jitterX = (Math.random() - 0.5) * 10;
        const jitterY = (Math.random() - 0.5) * 6;

        const x = columnX + jitterX;
        const y = marginY + baseY + jitterY;

        const baseSize = 3 + skill.proficiency * 2;

        nodes.push({
          ...skill,
          x,
          y,
          baseSize,
          currentSize: baseSize,
          currentOpacity: 0.25,
        });
      });
    });

    const nodesByCategory: Record<string, Node[]> = {};
    nodes.forEach((n) => {
      if (!nodesByCategory[n.category]) nodesByCategory[n.category] = [];
      nodesByCategory[n.category].push(n);
    });

    // edges between categories (left→right) to mimic layered neural net
    skills.forEach((cat, catIndex) => {
      const fromNodes = nodesByCategory[cat.category] || [];
      const nextCat = skills[catIndex + 1];
      if (!nextCat) return;
      const toNodes = nodesByCategory[nextCat.category] || [];
      if (toNodes.length === 0) return;

      fromNodes.forEach((source) => {
        const connectionCount = Math.min(2, toNodes.length);
        for (let i = 0; i < connectionCount; i++) {
          const target =
            toNodes[Math.floor(Math.random() * toNodes.length)];
          edges.push({ from: source, to: target });
        }
      });
    });

    // ---------- Event handlers (hover & click) ----------

    const findNearestNode = (canvasX: number, canvasY: number) => {
      let nearest: Node | null = null;
      let best = Infinity;
      nodes.forEach((n) => {
        const dx = n.x - canvasX;
        const dy = n.y - canvasY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < best) {
          best = d;
          nearest = n;
        }
      });
      return { nearest, distance: best };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      // local CSS coordinates (for tooltip)
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      // scale into canvas coordinate system
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const canvasX = localX * scaleX;
      const canvasY = localY * scaleY;

      mouseRef.current = { x: canvasX, y: canvasY };

      const { nearest, distance } = findNearestNode(canvasX, canvasY);

      if (nearest && distance < 24) {
        hoverSkillNameRef.current = nearest.name;
        setTooltipState({
          visible: true,
          x: localX + 10,
          y: localY + 10,
          text: nearest.name,
        });

        if (
          onSkillHover &&
          (nearest.name !== lastHoverSkillForNotifyRef.current ||
            nearest.category !== hoverCategoryRef.current)
        ) {
          lastHoverSkillForNotifyRef.current = nearest.name;
          onSkillHover(nearest.name, nearest.category);
        }
      } else {
        hoverSkillNameRef.current = null;
        setTooltipState({ visible: false, x: 0, y: 0, text: "" });
        if (onSkillHover && lastHoverSkillForNotifyRef.current) {
          lastHoverSkillForNotifyRef.current = null;
          onSkillHover(null, null);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!onCategorySelect) return;

      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const canvasX = localX * scaleX;
      const canvasY = localY * scaleY;

      const { nearest, distance } = findNearestNode(canvasX, canvasY);
      if (nearest && distance < 24) {
        // toggle category selection via parent
        onCategorySelect(nearest.category);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    // ---------- Animation loop ----------

    const animate = () => {
      timeRef.current += 0.015;

      const baseGrey = "hsl(210 10% 78%)";

      ctx.clearRect(0, 0, width, height);

      const hoverCategory = hoverCategoryRef.current;
      const selectedCategory = selectedCategoryRef.current;
      const activeCategory = hoverCategory || selectedCategory || null;
      const hoveredSkillName = hoverSkillNameRef.current;

      // edges first
      ctx.globalCompositeOperation = "source-over";
      edges.forEach((edge) => {
        const { from, to } = edge;
        const isActiveEdge =
          activeCategory &&
          (from.category === activeCategory || to.category === activeCategory);
        const isHoveredEdge =
          hoveredSkillName &&
          (from.name === hoveredSkillName || to.name === hoveredSkillName);

        let strokeCol = baseGrey;
        let opacity = 0.18;
        let lineWidth = 0.7;

        if (isActiveEdge) {
          const col = categoryColors[from.category] || "hsl(220 90% 55%)";
          strokeCol = brightenHsl(col, 5);
          opacity = isHoveredEdge ? 0.6 : 0.4;
          lineWidth = isHoveredEdge ? 1.4 : 1.0;
        }

        ctx.strokeStyle = `rgba(${colToRgba(strokeCol, opacity)})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });

      // nodes with lighter blending for intersection glow
      ctx.globalCompositeOperation = "lighter";

      nodes.forEach((node, idx) => {
        const wobble = Math.sin(timeRef.current * 1.5 + idx * 0.7) * 2;
        const x = node.x;
        const y = node.y + wobble;

        const isHoveredNode = hoveredSkillName === node.name;
        const isInActiveCategory =
          !!activeCategory && node.category === activeCategory;

        let targetSize = node.baseSize;
        let targetOpacity = 0.22;
        let fillColor = baseGrey;

        if (isInActiveCategory) {
          const col = categoryColors[node.category] || "hsl(220 90% 55%)";
          fillColor = col;
          targetSize = node.baseSize + 2.5;
          targetOpacity = 0.7;
        }

        if (isHoveredNode) {
          const col = categoryColors[node.category] || "hsl(220 90% 55%)";
          fillColor = brightenHsl(col, 10);
          targetSize = node.baseSize + 5;
          targetOpacity = 1;
        }

        node.currentSize += (targetSize - node.currentSize) * 0.2;
        node.currentOpacity +=
          (targetOpacity - node.currentOpacity) * 0.2;

        ctx.fillStyle = `rgba(${colToRgba(fillColor, node.currentOpacity)})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1.5, node.currentSize), 0, Math.PI * 2);
        ctx.fill();

        if (isHoveredNode || isInActiveCategory) {
          const haloCol = brightenHsl(
            categoryColors[node.category] || baseGrey,
            isHoveredNode ? 15 : 5
          );
          ctx.strokeStyle = `rgba(${colToRgba(haloCol, 0.35)})`;
          ctx.lineWidth = isHoveredNode ? 2 : 1;
          ctx.beginPath();
          ctx.arc(
            x,
            y,
            Math.max(1.5, node.currentSize) + (isHoveredNode ? 6 : 4),
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      });

      ctx.globalCompositeOperation = "source-over";

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // run once

  const categoryCounts = skills.map((category) => ({
    category: category.category,
    count: category.skills.length,
  }));

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="
            w-full h-auto max-w-sm 
            rounded-2xl 
            bg-gradient-to-br from-background via-background/90 to-background 
            shadow-[0_0_60px_rgba(15,23,42,0.9)]
          "
        />

        {/* Tooltip stays the same below */}
        {tooltipState.visible && (
          <div
            className="pointer-events-none absolute z-20 rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border"
            style={{
              left: tooltipState.x,
              top: tooltipState.y,
            }}
          >
            {tooltipState.text}
          </div>
        )}
      </div>


      {/* Category legend under the network */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-md">
        {categoryCounts.map((item) => (
          <div
            key={item.category}
            className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-smooth text-center"
          >
            <p className="font-semibold text-sm text-primary">{item.count}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {item.category}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground max-w-md">
        Each column is a{" "}
        <span className="font-semibold text-foreground">skill category</span>,
        and the lines show how tools and languages connect in real projects.
        Hover or click to explore.
      </p>
    </div>
  );
};

export default SkillGlobe;
