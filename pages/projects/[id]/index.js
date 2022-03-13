import { useRouter } from "next/router";
import Project from "./prop";

const GetID = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      {/* {console.log(typeOf(id))} */}
      {id && <Project id={id} />}
    </>
  );
};

export default GetID;
