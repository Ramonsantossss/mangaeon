import { ChapterList } from '@/components/chapter-list';
import { toErrorReponse } from '@/lib/utils';
import { ChapterResponse } from '@/types/chapters';

const fetchChaptersList = async (id: string, page: number) => {
  const res = await fetch(
    `https://mangalivre.net/series/chapters_list.json?id_serie=${id}&page=${page}`,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw toErrorReponse(res);
  const chps: ChapterResponse = await res.json();
  return { chapters: chps.chapters, page };
};

export default async function Manga({ params }: { params: { id: string } }) {
  const initial = await fetchChaptersList(params.id, 1);

  return <ChapterList id={params.id} initialData={initial} />;
}