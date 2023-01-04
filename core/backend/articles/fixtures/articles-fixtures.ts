import { Article } from "../entities/articles";

export const fakeArticle1: Article = {
  id: "1",
  summary:
    "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application.",
  topic: "React",
  title: "React Performance: How to avoid redundant re-renders",
  date: 1666072894896,
  lightMode: true,
  hide: false,
  timeToRead: "7 min read",
  content: [
    {
      type: "h1",
      id: 1,
      children: [
        {
          color: "#000",
          text: "React Performance: How to avoid redundant re-renders",
        },
      ],
    },
    {
      type: "img",
      width: 424,
      id: 2,
      url: "https://isamatov.com/images/react-avoid-redundant-renders/React%20Performance-%20How%20to%20avoid%20redundant%20re-renders.png",
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 55,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 3,
      children: [
        {
          color: "#000",
          text: "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application.",
        },
      ],
    },
    {
      type: "p",
      id: 54,
      children: [{ text: "" }],
    },
    {
      type: "h2",
      id: 13456,
      children: [{ text: "Spend time planning your state" }],
    },
    {
      type: "p",
      id: 45643,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 53434535,
      children: [
        {
          text: "Think about the role of the state in the feature. How can you make it easy to extend it in the future, and which data structures should you use? It might seem like a lot of work upfront, but it will save you time and headaches in the long run as the new business requirements come in.",
        },
      ],
    },
    {
      type: "h2",
      id: 134563453,
      children: [{ text: "Avoid keeping the state in different places" }],
    },
    {
      type: "p",
      id: 456443523,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 45643653465547,
      children: [
        {
          text: "A common mistake I see is a component with multiple sources of state, which makes it hard to visualize the state logic and the flow of the data.I’ve seen one component rely on URL params, Redux, and local storage. Unsurprisingly, it was hard to decipher what was going on with it.Instead, aim to have one state source within your component. If you have a form that relies on Redux, make sure that it gets all of its data from Redux.Of course, sometimes, you have to use multiple sources of state. But that doesn’t mean that you can’t abstract them from each other.For example, if the same form needs to get its initial data set from URL params, wrap it in another component and have that component read URL params and pass them as props. This way, the core component stays loosely coupled, and it’s easier to reason about its inner state logic.",
        },
      ],
    },
    {
      type: "p",
      id: 45644352334,
      children: [{ text: "" }],
    },

    {
      type: "h2",
      id: 1345634533452345,
      children: [{ text: "REZARGDSFGFSDHFSDHDFH" }],
    },
    {
      type: "p",
      id: 456443523524352,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 4445353523424234,
      children: [
        {
          text: "A common mistake I see is a component with multiple sources of state, which makes it hard to visualize the state logic and the flow of the data.I’ve seen one component rely on URL params, Redux, and local storage. Unsurprisingly, it was hard to decipher what was going on with it.Instead, aim to have one state source within your component. If you have a form that relies on Redux, make sure that it gets all of its data from Redux.Of course, sometimes, you have to use multiple sources of state. But that doesn’t mean that you can’t abstract them from each other.For example, if the same form needs to get its initial data set from URL params, wrap it in another component and have that component read URL params and pass them as props. This way, the core component stays loosely coupled, and it’s easier to reason about its inner state logic.dsghmdshglmksdjglkmjdslgjosdfijglsd glmsd glsd glds gjlsdjglsdfjglkdfsjglqhglkqkswdjdgfoidsjtk  gskdhglkqdnglqsdnfgjqlkgjwsjglqkngfkfdjgiodsktnrlmfgjnq mgqdsfmghqg qdgnbqkdsgjdqhfqsjfhf i type very fast lol qshfoqsifqhdsklfhqslikfghdqlefjhlqshdoifhvqslknrqzifriosqhdfkqnsfmklhsdfjkhqsdlmfkhqskjfhqklsdfhqlmsfjsqmofihisqjghklmdsfghdilfmhgvdmqhf mqmsfh qsimlfh m<swdf qismdfhiqdkshfgklqdshfgkjqsdhgk qdsg qhgfkldqhfgkjdhqskfhgoqdsmhnfkq fmqshfkmlqshdfklqs fkqhsdfgmh swdomfgjhqotfghqdlksmgfjnlmkqsdhfglmqkjfglmqdsjgpodqjg qsdmjgmoqdsjgflmfdshjgmhdqfgmdqhj gs dlfgjdfqfg qdsftest  fdlsqkhfklmqshfglqdshglm test mljfqsmlfhqlmsdfhqskjfklqsjflqsjfvjqdopsjfl qslkfjqlsmfjlmsqdjfmlnsqlfnqlmsfjvpxwjvqksnflm fmlqsjflmjqslmdfjlmqs dflmqjsfl mqsklfj qlsmfjqlms,nflm qdskmg qdklsmfhjglmkqsdjgn lijfgmoqdjnflmqskjfg vmlqsdjnflmqs fdkqshflkmdqshfmklqsdjfomqshjflmk qdsnfilmqdshnflmqsiknfioqdshjflkmqshnfklmqsdhjfklqshjfklmqsdjfklqdsjfklqdsgjvfgpqdjnflkjvlmq,nflqmsncvlmqsdjvlqmsfjqosjnvfcqksdjgilqhsfgjqesilfrjqsfjdlqjfsdlmjglkeng qdstjngdzlfdjlqisdfdjtgfmqnse gqehzfkqds jfgqdsjglmkqjdsfgljqdslmgjqogmjqerlm ",
        },
      ],
    },
    {
      type: "h2",
      id: 13456345334523453,
      children: [{ text: "kflmqdsjmlfjflkqdsmjflm" }],
    },
    {
      type: "p",
      id: 45644324352112,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 444534242335622,
      children: [
        {
          text: "A common mistake I see is a component with multiple sources of state, which makes it hard to visualize the state logic and the flow of the data.I’ve seen one component rely on URL params, Redux, and local storage. Unsurprisingly, it was hard to decipher what was going on with it.Instead, aim to have one state source within your component. If you have a form that relies on Redux, make sure that it gets all of its data from Redux.Of course, sometimes, you have to use multiple sources of state. But that doesn’t mean that you can’t abstract them from each other.For example, if the same form needs to get its initial data set from URL params, wrap it in another component and have that component read URL params and pass them as props. This way, the core component stays loosely coupled, and it’s easier to reason about its inner state logic.dsghmdshglmksdjglkmjdslgjosdfijglsd glmsd glsd glds gjlsdjglsdfjglkdfsjglqhglkqkswdjdgfoidsjtk  gskdhglkqdnglqsdnfgjqlkgjwsjglqkngfkfdjgiodsktnrlmfgjnq mgqdsfmghqg qdgnbqkdsgjdqhfqsjfhf i type very fast lol qshfoqsifqhdsklfhqslikfghdqlefjhlqshdoifhvqslknrqzifriosqhdfkqnsfmklhsdfjkhqsdlmfkhqskjfhqklsdfhqlmsfjsqmofihisqjghklmdsfghdilfmhgvdmqhf mqmsfh qsimlfh m<swdf qismdfhiqdkshfgklqdshfgkjqsdhgk qdsg qhgfkldqhfgkjdhqskfhgoqdsmhnfkq fmqshfkmlqshdfklqs fkqhsdfgmh swdomfgjhqotfghqdlksmgfjnlmkqsdhfglmqkjfglmqdsjgpodqjg qsdmjgmoqdsjgflmfdshjgmhdqfgmdqhj gs dlfgjdfqfg qdsftest  fdlsqkhfklmqshfglqdshglm test mljfqsmlfhqlmsdfhqskjfklqsjflqsjfvjqdopsjfl qslkfjqlsmfjlmsqdjfmlnsqlfnqlmsfjvpxwjvqksnflm fmlqsjflmjqslmdfjlmqs dflmqjsfl mqsklfj qlsmfjqlms,nflm qdskmg qdklsmfhjglmkqsdjgn lijfgmoqdjnflmqskjfg vmlqsdjnflmqs fdkqshflkmdqshfmklqsdjfomqshjflmk qdsnfilmqdshnflmqsiknfioqdshjflkmqshnfklmqsdhjfklqshjfklmqsdjfklqdsjfklqdsgjvfgpqdjnflkjvlmq,nflqmsncvlmqsdjvlqmsfjqosjnvfcqksdjgilqhsfgjqesilfrjqsfjdlqjfsdlmjglkeng qdstjngdzlfdjlqisdfdjtgfmqnse gqehzfkqds jfgqdsjglmkqjdsfgljqdslmgjqogmjqerlm ",
        },
      ],
    },
  ],
};

export const fakeArticle1WithContentStringify = {
  ...fakeArticle1,
  content: JSON.stringify(fakeArticle1.content),
};

export const fakeArticle2: Article = {
  id: "2",
  topic: "Craftmanship",
  date: 1665986494896,
  summary:
    "What happens when you blindly follow the best practice without understanding why? You end up with software that is not optimized for your needs or environment.",
  title:
    "Reclaiming Responsibility From Best Practices in Software Development",
  lightMode: false,
  timeToRead: "5 min read",

  hide: false,
  content: [
    {
      type: "h1",
      id: 1,
      children: [
        {
          color: "#08fdd8",
          text: "Reclaiming Responsibility From Best Practices in Software Development",
        },
      ],
    },
    {
      type: "img",
      width: 424,
      id: 2,
      url: "https://isamatov.com/images/challenging-software-development-best-practices/challenging%20software%20development%20best%20practices.png",
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 55,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 3,
      children: [
        {
          text: "What happens when you blindly follow the best practice without understanding why? You end up with software that is not optimized for your needs or environment.",
          color: "#c5f6fa",
        },
      ],
    },
    {
      type: "p",
      id: 54,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 7,
      align: "right",
      children: [
        {
          text: "fake text",
          color: "#c5f6fa",
        },
      ],
    },
    {
      type: "a",
      id: 34524,
      url: "https://clementgombauld.netlify.app",
      children: [{ text: "my url" }],
    },
  ],
};

export const fakeArticle2WithContentStringify = {
  ...fakeArticle2,
  content: JSON.stringify(fakeArticle2.content),
};
