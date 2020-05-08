let socketio = io.connect();

socketio.on("change_video", (embed) => {
  $("#video").attr("src", embed);
});
