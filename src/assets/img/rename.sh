rm slideshow/*
a=1
for i in ./slideshow-org/*; do
  new=$(printf "slide%d" "$a")
  cp -- "$i" ./slideshow/"$new"
  let a=a+1
done
# put the output of this line into the slide box page code for loop
ls -1q slideshow/ | wc -l
