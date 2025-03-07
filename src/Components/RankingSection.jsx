const RankingsSection = () => {
    const menRankings = [
      { name: "Rajyavardhan Singh Rathore", event: "Men double trap", img: "/images/Rajyavardhan.jpg" },
      { name: "Abhinav Bindra", event: "10m Air Rifle", img: "/images/Abhinav.jpg" },
      { name: "Gagan Narang", event: "10m Air Rifle", img: "/images/Gagan.jpg" },
      { name: "Vijay Kumar", event: "Men 25m rapid fire pistol", img: "/images/Vijay.jpg" },
    ];
  
    const womenRankings = [
      { name: "Manu Bhaker", event: "10m Air Rifle", img: "/images/manu.jpg" },
      { name: "Manu Bhaker", event: "10m Air Rifle", img: "/images/manu.jpg" },
      { name: "Manu Bhaker", event: "10m Air Rifle", img: "/images/manu.jpg" },
      { name: "Manu Bhaker", event: "10m Air Rifle", img: "/images/manu.jpg" },
    ];
  
    return (
      <section className="py-12 bg-white px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Men's Rankings */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-black md:text-2xl font-bold">MEN&apos;S RANKINGS</h2>
              <a href="#" className="text-blue-500 text-sm">SEE ALL</a>
            </div>
            <div className="mt-4 space-y-4">
              {menRankings.map((athlete, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <p className="text-xs text-gray-600">{athlete.event}</p>
                    <h3 className="text-md font-semibold">{athlete.name}</h3>
                  </div>
                  <img src={athlete.img} alt={athlete.name} className="w-20 h-20 object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>
  
          {/* Women's Rankings */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-black md:text-2xl font-bold">WOMEN&apos;S RANKINGS</h2>
              <a href="#" className="text-blue-500 text-sm">SEE ALL</a>
            </div>
            <div className="mt-4 space-y-4">
              {womenRankings.map((athlete, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <p className="text-xs text-gray-600">{athlete.event}</p>
                    <h3 className="text-md font-semibold">{athlete.name}</h3>
                  </div>
                  <img src={athlete.img} alt={athlete.name} className="w-20 h-20 object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default RankingsSection;
  