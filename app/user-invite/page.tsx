import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import UserinviteForm from "@/app/components/forms/UserInvite";
import { Heading5, Small } from "@/app/components/typography/Typography";
import Link from "next/link";
import React from "react";

function Userinvite() {
  return (
    <AuthLayout>
      <div className="mt-2"> {/* Add margin-top to create space from AuthLayout */}
      <div className="flex flex-col space-y-16">
        <Small
            content={
              <span className="text-sm font-BricolageGrotesqueRegular">
                Existing user?{" "}
                <Link
                  href={"/login"}
                  className="text-OWANBE_PRY underline cursor-pointer hover:text-OWANBE_PRY hover:underline"
                >
                  Sign in 
                </Link>
              </span>
          }
          className="float-right place-self-end"
        />

        <div className="md:w-4/5 md:mx-auto flex flex-col space-y-8">
          <Heading5 className="" content="Invite new user into the Backoffice" />
          <UserinviteForm />
        </div>
      </div>
      </div>
    </AuthLayout>
  );
}

export default Userinvite;
