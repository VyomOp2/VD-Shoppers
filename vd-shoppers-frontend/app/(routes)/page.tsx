import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container"

export const revalidate = 0; 

const HomePage = async () => {

    const billboard = await getBillboard("66910eb01214a51912b766e5");

    return ( 
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard
                    data={billboard}
                />
            </div>
        </Container>
     );
}
 
export default HomePage;
