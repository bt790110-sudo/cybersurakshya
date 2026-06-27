import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  bg,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-2xl
        bg-gradient-to-br
        ${bg}
        border
        border-slate-700
        shadow-xl
        p-6
      `}
    >
      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h1 className="text-4xl font-bold mt-3">
            {value}
          </h1>

          <p className="text-green-400 mt-4">
            {change}
          </p>

        </div>

        <div
          className={`
            p-4
            rounded-xl
            bg-slate-900/50
          `}
        >
          <Icon
            size={32}
            className={color}
          />
        </div>

      </div>
    </motion.div>
  );
}