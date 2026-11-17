const available = new Set(["thali","tiffin","dal-rice","roti","khichdi","paneer","bulk-meal"]);
export default function MealIcon({ name, size = 48 }) {
  const asset = available.has(name) ? name : "thali";
  return <img className="meal-icon" data-size={size} src={"/images/brand/" + asset + ".webp"}
    alt="" aria-hidden="true" width={size} height={size} loading="lazy" decoding="async" />;
}
