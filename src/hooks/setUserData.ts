export const SetUserData = () => {
    try {
      localStorage.setItem("hp", "3");
      localStorage.setItem("money", "3");
      localStorage.setItem("item", JSON.stringify([]));
      localStorage.setItem("charateristic", JSON.stringify([]));
      localStorage.setItem("readAbleStory", JSON.stringify([]));
      localStorage.setItem("readStory", JSON.stringify([]));
      localStorage.setItem("storyParts", "1");
      const subCharater = {
        "테스트 캐릭터1": {
          open: false,
          progress: 0,
        },
        "테스트 캐릭터2": {
          open: false,
          progress: 0,
        },
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({ userItem: [], subCharater: subCharater })
      );
    } catch (e) {
      console.error("Error: SetUserData()");
      console.error(e);
    }
  };