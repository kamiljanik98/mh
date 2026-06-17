import { Button } from "@/components/ui/button";
import Link from "next/link";

const CodeSuccess = () => {
  return (
    <div className="text-green-500">
      <p>Success!</p>
      <Button>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
};

export default CodeSuccess;
