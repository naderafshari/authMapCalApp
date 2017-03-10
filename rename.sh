rm src/assets/img/slideshow/*
a=1
for i in resources/slideshow/*; do
  new=$(printf "slide%d" "$a")
  cp -- "$i" src/assets/img/slideshow/"$new"
  let a=a+1
done
# put the output of this line into the slide box page code for loop
ls -1q src/assets/img/slideshow/ | wc -l
