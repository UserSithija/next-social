import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import AddNewPost from "@/components/user/AddNewPost";
import Feed from "@/components/user/Feed";
import Stories from "@/components/user/Stories";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT */}
      <div className=" hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      {/* CENTER FEED */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddNewPost />
          <Feed />
        </div>
      </div>
      {/* RIGHT */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Homepage;
