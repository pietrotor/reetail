import constructionGif from "@/assets/images/construction.gif";

export const OnConstruction = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={constructionGif} className="w-1/2" />
    </div>
  );
};
