const ExecutiveCommittee = () => {
    const members = [
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
      { name: "Your Name", position: "Your Position", img: "/images/pravashsir.png" },
    ];
  
    return (
      <section className="py-12 px-4 md:px-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">EXECUTIVE COMMITTEE</h2>
          <p className="text-gray-300 mb-8">
            The Executive Committee consists of the ISSF President, Vice-Presidents, Chairman of the Technical
            Committee, Chairman of the Athletes Committee, and elected representatives.
          </p>
  
          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img src={member.img} alt={member.name} className="w-full " />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ExecutiveCommittee;
  