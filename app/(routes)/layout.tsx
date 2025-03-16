import DashboardProvider from './provider';
import { Toaster } from "@/components/ui/sonner"


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