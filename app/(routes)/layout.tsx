import { Metadata } from 'next';
import DashboardProvider from './provider';
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
    title: "Screenshot To Code",
    description:
      "Convert any screenshot or design to clean code",
  };

async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <DashboardProvider>
            {children}
            <Toaster richColors expand={false} position="top-center" />

        </DashboardProvider>
    )
}

export default DashboardLayout