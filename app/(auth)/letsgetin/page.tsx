"use client";
import LoginForm from "@/app/components/organisms/forms/Login";
import React, { useState } from "react";

// export const metadata: Metadata = {
//   title: "The Facebook | Auth",
// };

enum Page {
  Login = 0,
  Signup = 1,
}



const LoginPage = () => {
  const [page, setPage] = useState(Page.Login);

  return (
    <div className="pt-24">
      {(
        <div className="grid grid-cols-[60%_40%] justify-center gap-x-5 border-2 w-full">
          <section className="w-full">
            {page === Page.Login && (
              <LoginForm onAuthViewChange={() => setPage(Page.Signup)} />
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
