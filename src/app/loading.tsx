import { CircularProgress } from "@nextui-org/react";
export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <CircularProgress size="lg" aria-label="Loading..." />
        </div>
    );
}
