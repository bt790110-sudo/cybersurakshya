import { motion } from "framer-motion";

export default function Panel({
  title,
  children,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`
        rounded-2xl
        bg-slate-800/70
        border
        border-slate-700
        backdrop-blur-md
        shadow-lg
        p-6
        ${className}
      `}
    >
      {title && (
        <h2 className="text-xl font-semibold mb-5">
          {title}
        </h2>
      )}

      {children}
    </motion.div>
  );
}