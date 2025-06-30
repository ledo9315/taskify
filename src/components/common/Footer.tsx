import { cn } from "@/src/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(`mt-auto pt-20 pb-6 ${className}`)}>
      <div className="border-t border-border/40 pt-6">
        <p className="text-tiny text-muted-foreground text-center tracking-wider">
          <span className="text-accent font-medium">team</span>
          <span className="opacity-80"> 23</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
