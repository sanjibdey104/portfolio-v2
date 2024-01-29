const ProjectDescPage = ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  console.log("route params", params);
  // route data is supplied to the component via "params"
  return (
    <div className="w-full h-full p-24 text-center">
      Project: <span className="font-bold">"{params.projectId}"</span>
    </div>
  );
};

export default ProjectDescPage;
