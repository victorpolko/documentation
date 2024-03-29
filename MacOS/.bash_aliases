# Bash
alias reload!='source ~/.bashrc'            # Reload bash
alias px='ps axf -o pid,user,comm'          # Nice processes tree
alias pxx='ps aux | grep -v grep | grep $1' # Search processes tree
alias contains="grep -rnw '.' -e $1"        # Search for text in files of current directory
alias tailf='tail -f'
alias tailn='tail -n $1'

alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias lsc='ls | wc -l' # Count non-hidden folders
alias count='ls | wc -l' # Count non-hidden folders

alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
alias cry='crystal'

# Ruby
alias be='bundle exec' # Shortcut for Ruby bundler
alias bes='be sidekiq' # Shortcut for sidekiq
alias ber='be rails' # Shortcut for Rails commands
alias berk='be rake' # Shortcut for Rake commands
alias berkmig='berk db:migrate'
alias berkroll='berk db:rollback'
alias berkmigd='berk data:migrate'
alias berkrolld='berk data:rollback'
alias reindex='berk searchkick:reindex:all'
alias reindexwork='berk searchkick:reindex CLASS=Work'

# NPM
alias npmr='npm run'
alias npmdev='npm run dev'

# Lame
alias lame='function _lamp3() { lame -h -b 192 $1 ${1%.wav}.mp3; }; _lamp3'
