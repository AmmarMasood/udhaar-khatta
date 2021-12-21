import { useContext } from "react";
import UserLayout from "@/components/common/UserLayout";
import UdhaarBookCard from "@/components/workspace/udhaarbook/UdhaarBookCard";
import { AuthContext } from "@/context/AuthContext";
import parseCookies from "@/helpers/cookieParser";

export default function CompleteProfile({ token, connectionId }) {
  const { user } = useContext(AuthContext);
  return (
    <UserLayout
      token={token}
      childern={
        <UdhaarBookCard token={token} user={user} connectionId={connectionId} />
      }
    />
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  //   this is only available on server and not cliet!!!!
  // how good is that fam?

  return {
    props: {
      token: token,
      connectionId: id,
    },
  };
}
