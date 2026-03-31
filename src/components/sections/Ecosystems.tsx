"use client";

export default function Ecosystems() {
  const ecosystems = [
    {
      name: "Alipay",
      description: "Digital Payment",
      opacity: "opacity-50"
    },
    {
      name: "WeChat Pay",
      description: "Mobile Payment",
      opacity: "opacity-50"
    },
    {
      name: "China Unicom",
      description: "Telecom Services",
      opacity: "opacity-50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-light-gray to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002147' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gold/10 border border-gold/20 rounded-full px-4 py-2 text-sm font-medium text-gold mb-6">
            Trusted Partners
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
            Supported Ecosystems
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We integrate with China&apos;s leading digital platforms to ensure seamless service delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ecosystems.map((ecosystem, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto mb-6 ${ecosystem.opacity} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-gray-500 font-bold text-lg">
                  {ecosystem.name.slice(0, 2)}
                </div>
              </div>
              <h3 className="font-bold text-navy text-xl mb-3 group-hover:text-gold transition-colors">
                {ecosystem.name}
              </h3>
              <p className="text-gray-600 text-medium leading-relaxed">
                {ecosystem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
