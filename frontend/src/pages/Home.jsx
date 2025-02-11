import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const classes = [
    "LKG", "UKG", 
    "Class-1", "Class-2", "Class-3", "Class-4", "Class-5", 
    "Class-6", "Class-7", "Class-8", "Class-9", "Class-10", 
    "Class-11", "Class-12"
  ];

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Select a Class</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((className) => (
          <button
            key={className}
            onClick={() => navigate(`/schedule/${className}`)}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {className}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
