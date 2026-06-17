import { Button } from "@/components/ui/button";
import Link from "next/link";

const CodeError = () => {
  return (
    <div className="text-red-500">
      <p>ERROR!</p>
      <Button>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
};

export default CodeError;
