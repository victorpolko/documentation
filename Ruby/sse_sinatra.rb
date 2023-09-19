require 'sinatra'

set :server, :puma # or e.g. :thin

get('/') { erb :index }

get '/sse-source', provides: 'text/event-stream' do
  content_type 'text/event-stream'
  # last_modified Time.now.httpdate

  logger.info "Opened stream at #{Time.now}"

  # stream :keep_open do |out| # keep_open works with :thin server, not with :puma
  stream do |out|
    out.callback { logger.info "Closed stream at #{Time.now}" }

    loop do
      out << "data: message start\n\n" # default event type is `message`

      out << "event: ping-event\n" # \n to separate parameters
      out << "data: #{Time.now}"
      out << "\n\n" # to end the message (essential!)

      out << "data: message end\n\n"

      sleep 1
    end
  end
end

__END__

@@ index
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSE on Sinatra</title>
</head>
<body style="font-family: Georgia, serif; font-style: italic;">
  <h1 style="text-wrap: balance">Server-Sent Events on Sinatra</h1>

  <button>Close the connection</button>

  <ul style="list-style: square; font-style: normal"></ul>

  <script>
    const evtSource = new EventSource(`/sse-source`);
    console.log(evtSource.withCredentials, evtSource.readyState, evtSource.url);

    const button = document.querySelector(`button`);
    const eventList = document.querySelector(`ul`);

    evtSource.onopen = () => {
      console.log(`Connection to server opened.`);
    };

    evtSource.onmessage = console.log;

    evtSource.addEventListener(`ping-event`, (e) => {
      addItem(`ping at ${e.data}...`)
    }, false);

    evtSource.onerror = () => { closeConnection(`EventSource failed`); };

    button.onclick = () => { closeConnection(`manually`); };

    function closeConnection(msg) {
      addItem(`Connection closed at ${new Date().toLocaleString()}: ${msg}.`);
      evtSource.close();
    }

    function addItem(text) {
      const newElement = document.createElement(`li`);
      newElement.innerHTML = text;
      eventList.appendChild(newElement);
    }
  </script>
</body>
</html>
