const Footer = () => {
  return (
    <div className="flex py-4 flex-col  items-center text-background/50 w-full text-[11px]">
      <div className="flex space-x-3">
        <a className="cursor-pointer hover:underline">Legal</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">Privacy</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">Cookie Manager</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">Cookie Policy</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">About us</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">Topics</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">Copyright</a>
        <span>-</span>
        <a className="cursor-pointer hover:underline">Feedback</a>
      </div>
      <a className="mt-2 cursor-pointer hover:underline">
        Language: <span className="text-neutral-100"> English(US)</span>
      </a>
    </div>
  );
};

export default Footer;
