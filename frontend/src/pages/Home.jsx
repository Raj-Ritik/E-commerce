import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrival from "../components/Products/NewArrival";
import ProductDetails from "../components/Products/ProductDetails";
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />
      {/* best seller */}
      <h2 className="mt-10 text-3xl text-center font-bold mb-2">Best Seller</h2>
      <ProductDetails />
    </div>
  );
};

export default Home;
