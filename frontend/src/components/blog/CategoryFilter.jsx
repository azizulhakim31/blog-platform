import { FiCoffee, FiCpu, FiGrid, FiMap, FiPenTool, FiZap } from "react-icons/fi";

const categoryIcons = {
    All: FiGrid,
    Technology: FiCpu,
    Design: FiPenTool,
    Lifestyle: FiCoffee,
    Productivity: FiZap,
    Travel: FiMap,
}
const CategoryFilter = ({ categories, activeCategory, onChange }) => {
    return (
        <div
            id="categories"
            className="flex flex-wrap gap-2"
            aria-label="Filter blogs by categry"
        >
            {categories.map((category) => {
                const Icon = categoryIcons[category] || FiGrid;
                const active = activeCategory === category;

                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onChange(category)}
                        aria-pressed={active}
                        className={`btn btn-sm sm:btn-md ${active ? "btn-primary" : "btn-outline"}`}
                    >
                        <Icon size={16} />
                        {category}
                    </button>
                )
            })}
        </div>
    );
};

export default CategoryFilter;