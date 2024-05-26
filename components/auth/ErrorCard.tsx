import { BackButton } from "./BackButton";
import { Header } from "./Header";
import { 
    Card,
    CardFooter,
    CardHeader,
 } from "@/components/ui/card";


 export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Oops! Something went wrong"/>
            </CardHeader>
            <CardFooter>
                <BackButton href="/auth/login" label="Go back to login"/>
            </CardFooter>
        </Card>
    )
 }