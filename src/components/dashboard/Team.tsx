import { Users, Award } from "lucide-react";

const ExecutiveCommittee = () => {
  const members = [
    { name: "Jane Doe", position: "President", img: "/images/pravashsir.png" },
    {
      name: "John Smith",
      position: "Vice President",
      img: "/images/pravashsir.png",
    },
    {
      name: "Emily Chen",
      position: "Technical Committee Chair",
      img: "/images/pravashsir.png",
    },
    {
      name: "Michael Rodriguez",
      position: "Athletes Committee Chair",
      img: "/images/pravashsir.png",
    },
    {
      name: "Sarah Kim",
      position: "Board Member",
      img: "/images/pravashsir.png",
    },
    {
      name: "David Wong",
      position: "Treasurer",
      img: "/images/pravashsir.png",
    },
    {
      name: "Alex Turner",
      position: "Secretary",
      img: "/images/pravashsir.png",
    },
    {
      name: "Olivia Martinez",
      position: "Strategic Advisor",
      img: "/images/pravashsir.png",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Users className="w-10 h-10 text-white mr-3" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Executive Committee
            </h2>
          </div>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Our leadership team brings together experienced professionals
            dedicated to driving innovation, strategic vision, and excellence in
            our organization.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden 
                         shadow-2xl border border-white/20 transition-all duration-300 
                         hover:scale-105 hover:shadow-3xl group"
            >
              <div className="relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-72 object-cover object-center 
                             transform transition-transform duration-300 
                             group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-blue-900/40 opacity-0 
                                group-hover:opacity-100 transition-opacity 
                                flex items-center justify-center"
                >
                  <Award
                    className="w-12 h-12 text-white opacity-0 
                                    group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-200 text-sm uppercase tracking-wider">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;
