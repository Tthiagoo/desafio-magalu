export function renderUniqueOption(opt: string) {
  const match = opt.match(/(.+?)(\s*\+R\$[\d,.]+)/);
  if (match) {
    return (
      <span>
        {match[1]}
        <span className="text-teal-600 font-semibold">{match[2]}</span>
      </span>
    );
  }
  return opt;
}

export function renderAllOptions(
  options: string[],
  product?: { options?: string[] }
) {
  return options.map((opt, i) => {
    if (opt.includes("?")) {
      const [main, sub] = opt.split("?");
      return (
        <div key={i} className="flex flex-col ml-1">
          <span className="flex items-center gap-1 text-neutral-700">
            <span className="text-neutral-400">•</span>
            <span>{main.trim()}?</span>
          </span>
          <span className="ml-4 text-neutral-400 flex items-center gap-1">
            {renderUniqueOption(sub.trim())}
          </span>
        </div>
      );
    }
    if (opt.match(/\+R\$/)) {
      return (
        <div key={i} className="flex items-center gap-1 ml-1">
          <span className="text-neutral-400">•</span>
          {renderUniqueOption(opt)}
        </div>
      );
    }
    if (
      opt.match(/^[a-zA-Zãáéíóúçêôûõâêîôû ]+$/) &&
      i > 0 &&
      product?.options &&
      product.options[i - 1]?.includes("escolha")
    ) {
      return (
        <div key={i} className="ml-7 text-neutral-500">
          {opt}
        </div>
      );
    }
    return (
      <div key={i} className="flex items-center gap-1 ml-1">
        <span className="text-neutral-400">•</span>
        <span>{opt}</span>
      </div>
    );
  });
}
