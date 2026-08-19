import { DOMAINS, DOMAIN_COLOR_CLASSES } from "@/lib/domains";

export default function ServicesGrid() {
  return (
    <section id="services" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            9 大 HR 戰略與自動化領域
          </h2>
          <p className="mt-3 text-ink-soft">
            從人才策略到薪酬設計，AI 診斷引擎覆蓋組織全生命週期的核心議題。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => {
            const colors = DOMAIN_COLOR_CLASSES[domain.color];
            return (
              <div
                key={domain.id}
                className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-elevate transition-all duration-200 hover:-translate-y-1 hover:shadow-elevate-lg"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${colors.bg}`}
                >
                  {domain.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{domain.zh}</h3>
                <p className="text-xs font-medium text-ink-soft">{domain.en}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{domain.zhDesc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
