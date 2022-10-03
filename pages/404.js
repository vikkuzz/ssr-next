import MainContainer from "../components/MainContainer";

export default function Error() {
  return (
    <MainContainer
      keywords={", 404, Такой страницы не существует"}
      description={"Такой страницы не существует"}
      title={"404"}
    >
      <h1 className={`error_page`}>МОЯ КАСТОМНАЯ СТРАНИЦА С ОШИБКОЙ</h1>
    </MainContainer>
  );
}
