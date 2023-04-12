import Link from "next/link";
import headerNavLinks from "../data/headerNavLinks";
import siteMetadata from "../data/siteMetadata";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import SectionContainer from "./SectionContainer";
import ThemeSwitch from "./ThemeSwitch";

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between px-4">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {typeof siteMetadata.headerTitle === "string" ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-black dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch></ThemeSwitch>
            <MobileNav></MobileNav>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer></Footer>
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
