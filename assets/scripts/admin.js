const socketio = io.connect();

$("#submit_video").on("click", () => {
  let link = $("#link").val();
  let id = getId(link);
  let embed = "https://www.youtube.com/embed/" + id;
  socketio.emit("change_video_admin", embed);
  $("#video").attr("src", embed);
});

// Code taken from stackoverflow.
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
