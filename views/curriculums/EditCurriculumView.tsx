import EditCurriculumForm from '@/components/curriculums/EditCurriculumForm';
import Loading from '@/components/loading-templates/Loading';
import { useGetCurriculumByIdQuery } from '@/redux/services/createApiCurriculum';
import { Curriculum } from '@/types/curriculum';

export default function EditCurriculumView({curriculumId}:{curriculumId: Curriculum["_id"]}) {

/*     const { data, isLoading, isError, error } = useQuery({
        queryKey: ["editCurriculum", curriculumId],
        queryFn: () => getCurriculumById(curriculumId),
        retry: false
    }); */

    const {data, isLoading, error /* isFetching */} = useGetCurriculumByIdQuery({curriculumId})

    if(isLoading) return <Loading />
    if(error) throw new Error("Error on useGetCurriculumByIdQuery");

    if(data) return <EditCurriculumForm data={data} curriculumId={curriculumId} />
}
