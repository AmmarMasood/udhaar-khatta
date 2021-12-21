import Main from "@/components/workspace/make-payment/Main";
import React from "react";
import parseCookies from "@/helpers/cookieParser";
export default function Index({ token, transactionId }) {
  return (
    <div>
      <Main />
    </div>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  //   this is only available on server and not cliet!!!!
  // how good is that fam?
  console.log(token);
  return {
    props: {
      token: token,
      transactionId: id,
    },
  };
}
