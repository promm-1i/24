import { prisma } from "@/lib/prisma";

const REVIEWS: { title: string; body: string; authorName: string }[] = [
  { title: "융통성 있게 설치해주셨어요", body: "매트리스 조립할때 나사가 부족했는데 융통성있게 잘 설치해주셨어요", authorName: "박*섭" },
  { title: "믿고 맡기는 이사가요", body: "믿고 맡기는 이사가요", authorName: "이*현" },
  { title: "합리적인 비용으로 만족했어요", body: "포장이사는 처음해봤는데 합리적인 비용으로 만족했습니다.", authorName: "김*현" },
  { title: "깔끔하게 청소해주셔서 만족했어요", body: "아기가 이제 100일이라서 걱정했는데 깔끔하게 청소해주셔서 만족했습니다!!!!!", authorName: "김*연" },
  { title: "마음 놓고 이사했습니다", body: "베테랑같은 분들이 와주셔서 마음 놓고 이사했습니다~!", authorName: "마*향" },
  { title: "다음에도 이용할게요", body: "2년뒤에도 이용 할게요.", authorName: "박*렬" },
  { title: "믿고 맡길 곳이 생겼어요", body: "공무원 특성상 이사를 자주다니는데 앞으로 믿고 맡길곳이 생긴거같아 좋습니다 ^^", authorName: "김*은" },
  { title: "포장이 꼼꼼해서 좋았어요", body: "포장이 꼼꼼해서 좋았어요", authorName: "정*현" },
  { title: "가구 배치까지 도와주셨어요", body: "가구 배치를 기존보다 훨씬 더 편하게 해주셨어요", authorName: "주*혜" },
  { title: "이사 후 정리까지 깔끔했어요", body: "이사 후 정리까지 깔끔했어요^^", authorName: "강*현" },
];

async function main() {
  const board = await prisma.board.upsert({
    where: { code: "review" },
    update: {},
    create: { code: "review", name: "고객 후기" },
  });

  // 기존 후기 전부 교체
  await prisma.post.deleteMany({ where: { boardId: board.id } });

  for (let i = 0; i < REVIEWS.length; i++) {
    const r = REVIEWS[i];
    await prisma.post.create({
      data: {
        boardId: board.id,
        title: r.title,
        body: r.body,
        authorName: r.authorName,
        rating: 5,
        status: "PUBLISHED",
        sortOrder: i,
      },
    });
  }

  console.log(`Seeded ${REVIEWS.length} reviews.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
