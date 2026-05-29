import { Link, useLocation } from "wouter";
import { useAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { LogOut, LayoutDashboard, Users, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { data: session, isLoading } = useAdminMe();
  const logout = useAdminLogout();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!session?.authenticated) {
    setLocation("/admin");
    return null;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        setLocation("/admin");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-navy text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/leads" className="font-serif font-bold text-xl flex items-center gap-2">
              <ShieldIcon className="h-6 w-6 text-gold" />
              Honor First CRM
            </Link>
            
            <nav className="hidden md:flex items-center gap-1 ml-6">
              <Link href="/admin/leads" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white">
                <Users className="h-4 w-4" /> Leads
              </Link>
              <a href="/api/admin/export" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white/80">
                <Download className="h-4 w-4" /> Export
              </a>
            </nav>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white/80 hover:text-white hover:bg-white/10">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
