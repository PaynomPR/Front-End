interface SidebarProps {
  sidebarOpen?: string;
}

const Footer = ({ sidebarOpen }: SidebarProps) => {
  return (
    <div
      className={` bg-gradient-to-r px-12 from-[#111031] grid grid-cols-2  align-middle content-center to-[#333160] min-h-[6vh]  bottom-0 w-full ${
        sidebarOpen === "true" ? "   md:w-full " : "  md:w-full "
      } `}
    >
      <p className="text-gray-600">© 2023 PaynomPR</p>
      <p className="text-[#111031] text-end">Version multiple</p>
    </div>
  );
};

export default Footer;
