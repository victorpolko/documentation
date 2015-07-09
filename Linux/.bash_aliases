# Make sure docker is run with superuser privileges
alias docker='sudo docker'

alias be='bundle exec' # Shortcut for Ruby bundler
alias ber='be rails' # Shortcut for Rails commands
alias berk='be rake' # Shortcut for Rake commands

# Nice processes tree
alias px='ps axf -o pid,user,comm'

# Search processes tree
alias pxx='px | grep $1'

alias tailf='tail -f'
alias tailn='tail -n $1'

# Some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias lsc='ls | wc -l '

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
