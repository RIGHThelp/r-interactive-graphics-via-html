## Script for simple functionality test:

library(devtools)
library(ggplot2)
load_all() # load the code under development as library:

rm(list = ls())

set.seed(123456)

subArray <- diamonds[sample(1:nrow(diamonds), 1000, TRUE), ]

fitObj <- loess(price ~ carat, subArray)
xRange <- range(subArray$carat)
fitArray <- data.frame(carat = seq(xRange[1], xRange[2], length.out = 100))
fitArray$price <- predict(fitObj, newdata = fitArray)

# Sanity check:
print(ggplot(NULL, aes(x = carat, y = price)) + 
        geom_point(data = subArray, color = "green", size = 2) +
        geom_line(data = fitArray, color = "black", size = 1.2))

# dir = "TEMP" is just for ease of debugging
print(RIGHT({plot(price ~ carat, subArray, type = "p")
             lines(price ~ carat, fitArray)
             boxplot(pirce ~ color, subArray)
             hist(color, subArray)
             pie(cut, subArray)
             search(subArray)
             table(subArray)},  
            dir = "TEMP",
            overwrite = TRUE))

