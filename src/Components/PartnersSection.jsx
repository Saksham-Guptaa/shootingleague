const PartnersSection = () => {
    return (
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">GSL PARTNERS & SPONSORS</h2>
  
        <div className="max-w-6xl mx-auto grid gap-12">
          {/* Premier Partners */}
          <div>
            <h3 className="text-lg font-semibold mb-4">PREMIER PARTNERS</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-red-500 w-40 h-20 rounded-lg shadow-md hover:scale-105 transition-transform"></div>
              ))}
            </div>
          </div>
  
          {/* Global Partners */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GLOBAL PARTNERS</h3>
            <div className="flex justify-center">
              <div className="bg-red-500 w-40 h-20 rounded-lg shadow-md hover:scale-105 transition-transform"></div>
            </div>
          </div>
  
          {/* Official Support & Drinks Partners */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">OFFICIAL SUPPORT</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {[1, 2].map((item) => (
                  <div key={item} className="bg-red-500 w-40 h-20 rounded-lg shadow-md hover:scale-105 transition-transform"></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">DRINKS PARTNERS</h3>
              <div className="flex justify-center">
                <div className="bg-red-500 w-40 h-20 rounded-lg shadow-md hover:scale-105 transition-transform"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default PartnersSection;
  