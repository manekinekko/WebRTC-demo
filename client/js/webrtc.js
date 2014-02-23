!function(window, document, $, undefined) {

	var socket = io.connect('http://localhost:8888');
	var getUserMedia =
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.MozGetUserMedia ||
		navigator.oGetUserMedia ||
		navigator.msGetUserMedia;
		
	$(function() {
		var video = document.getElementById('client-video');
		var receive = $('#receive');
		var canvas = document.getElementById('remote-video');
			
		socket.emit('hello', { hello: 'world' });
		socket.on('capture', function(data) {
			receive.attr('src', data);
		});

		if (!getUserMedia) {
			// alert('your browser unsupported webrtc.');
			return false;
		}
				
		navigator.webkitGetUserMedia('video audio', function(stream) {
			video.src = webkitURL.createObjectURL(stream);
			video.addEventListener('error', function () {
				stream.stop();
			});
		});
		
		video.addEventListener('timeupdate', function(e) {
			var ctx = canvas.getContext('2d');
			
			ctx.drawImage(video, -video.width/2, -video.height/2);
		});
		
		socket.emit('capture', canvas.toDataURL());
	});
	
}(window, document, jQuery);