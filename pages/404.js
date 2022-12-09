import MainContainer from '../components/MainContainer';
import NotFound from '../components/NotFound';

export default function Error() {
    return (
        <MainContainer
            keywords={', 404, Такой страницы не существует'}
            description={'Такой страницы не существует'}
            title={'404'}
            bodyBackgr={'404'}
        >
            <NotFound />
        </MainContainer>
    );
}
