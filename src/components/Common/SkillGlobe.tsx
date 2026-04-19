import { useEffect, useRef, useState, useMemo } from "react";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { courses } from "@/data/courses";
import { ChevronDown, ArrowRight } from "lucide-react";
import TechBadge from "@/components/Common/TechBadge";
import { Link } from "react-router-dom";

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

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const openCategoryRef = useRef<string | null>(null);
  openCategoryRef.current = openCategory;

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
        "hsl(220 90% 65%)", // Languages — blue
        "hsl(270 85% 65%)", // ML & AI — purple
        "hsl(160 75% 50%)", // Data & Analytics — emerald
        "hsl(190 85% 55%)", // Web & Backend — cyan
        "hsl(300 70% 60%)", // Tools & DevOps — fuchsia
      ][idx % 5];
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const isMobile = window.innerWidth < 768;
      canvas.width = isMobile ? 360 : 560;
      canvas.height = isMobile ? 280 : 340;
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
        onCategorySelect(nearest.category);
        const next = openCategoryRef.current === nearest.category ? null : nearest.category;
        setOpenCategory(next);
        setSelectedSkill(null);
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
    skills: category.skills,
  }));

  const categoryBottomBorder: Record<string, string> = {
    "Languages":       "border-b-2 border-b-blue-500",
    "ML & AI":         "border-b-2 border-b-violet-500",
    "Data & Analytics":"border-b-2 border-b-emerald-500",
    "Web & Backend":   "border-b-2 border-b-cyan-500",
    "Tools & DevOps":  "border-b-2 border-b-orange-500",
  };

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const toggleDropdown = (category: string) => {
    setOpenCategory((prev) => {
      if (prev === category) { setSelectedSkill(null); return null; }
      return category;
    });
  };

  const selectSkill = (skill: string) => {
    setSelectedSkill((prev) => prev === skill ? null : skill);
  };

  // Build featured work for selected skill
  const featuredWork = selectedSkill ? [
    ...projects
      .filter((p) => p.techStack.includes(selectedSkill))
      .map((p) => ({
        key: `proj-${p.id}`,
        title: p.title,
        summary: p.description.split(".")[0] + ".",
        href: `/projects/${p.id}`,
        type: "Project" as const,
      })),
    ...experiences
      .filter((e) => e.skills.includes(selectedSkill))
      .map((e) => ({
        key: `exp-${e.id}`,
        title: `${e.role} @ ${e.organization}`,
        summary: e.description[0],
        href: `/experience?view=cards#${e.id}`,
        type: "Experience" as const,
      })),
    ...courses
      .filter((c) => c.categories.includes(selectedSkill))
      .map((c) => ({
        key: `course-${c.id}`,
        title: c.title,
        summary: c.description ? c.description.split(".")[0] + "." : "",
        href: `/courses#${c.id}`,
        type: "Course" as const,
      })),
  ] : [];

  const typePill: Record<string, string> = {
    Project:    "bg-blue-500/15 text-blue-600 dark:text-blue-300",
    Experience: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
    Course:     "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  };

  return (
    <div className="flex flex-col items-center gap-8" onClick={(e) => {
      if (!(e.target as Element).closest("[data-category-box]")) {
        setOpenCategory(null);
        setSelectedSkill(null);
      }
    }}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          data-category-box
          className="
            w-full h-auto max-w-lg
            rounded-2xl
            bg-linear-to-br from-background via-background/90 to-background
            shadow-[0_0_60px_rgba(15,23,42,0.9)]
          "
        />

        {tooltipState.visible && (
          <div
            className="pointer-events-none absolute z-20 rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border"
            style={{ left: tooltipState.x, top: tooltipState.y }}
          >
            {tooltipState.text}
          </div>
        )}
      </div>

      {/* Category legend + dropdowns */}
      <div className="w-full max-w-xl" data-category-box>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {categoryCounts.map((item) => {
            const isOpen = openCategory === item.category;
            return (
              <button
                key={item.category}
                onClick={() => toggleDropdown(item.category)}
                className={`w-full p-3 rounded-lg border transition-all duration-200 text-center cursor-pointer ${categoryBottomBorder[item.category] ?? ""} ${
                  isOpen
                    ? "bg-primary/10 border-primary shadow-[0_0_12px_rgba(59,130,246,0.25)]"
                    : "bg-muted/50 border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <p className="font-semibold text-sm text-primary">{item.count}</p>
                <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                <ChevronDown
                  className={`h-3 w-3 mx-auto mt-1 text-primary/60 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Skill badges panel */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: openCategory ? "200px" : "0px" }}
        >
          {categoryCounts.map((item) => (
            <div key={item.category}>
              {openCategory === item.category && (
                <div className="mt-2 rounded-xl border border-primary/30 bg-background/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(59,130,246,0.2)] p-3">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {item.skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={(e) => { e.stopPropagation(); selectSkill(skill); }}
                        className={`transition-all duration-150 rounded-sm ${selectedSkill === skill ? "ring-1 ring-primary/60 scale-105" : "hover:scale-105"}`}
                      >
                        <TechBadge>{skill}</TechBadge>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Featured Work panel */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: selectedSkill && featuredWork.length > 0 ? `${featuredWork.length * 72 + 60}px` : "0px" }}
        >
          {selectedSkill && featuredWork.length > 0 && (
            <div className="mt-3 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Featured Work — {selectedSkill}
              </p>
              <ul className="space-y-2">
                {featuredWork.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.href}
                      className="flex items-start gap-3 group rounded-lg px-2 py-1.5 hover:bg-primary/5 transition-colors"
                    >
                      <span className={`mt-0.5 shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${typePill[item.type]}`}>
                        {item.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {item.summary}
                        </p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 mt-1 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
