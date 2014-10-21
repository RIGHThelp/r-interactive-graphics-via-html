## qplot_RIGHT.R

#' @title Extract data object's name
#' 
#' @description Function to create data object name in qplot function.
#' 
#' @param x xaxis to draw graph.
#' @param y yaxis to draw graph. Default is NULL
#' @param ... other options to draw graph(colour, fill)
#' @param data a data.frame object.
#' @param geom graph type to draw(point, line, bar, boxplot). Default is "point"
#' 
#' @seealso \code{\link{qplot}}
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' RIGHT({qplot(x=Time, y=conc, data=Theoph, geom="point", colour=Subject)
#'        qplot(x=Time, fill=Subject, data=Theoph, geom="bar")})
#' }
createQlot <- function(x, y = NULL, ..., data, geom = "point") {
  
  .all_aesthetics <- c("adj", "alpha", "angle", "bg", "cex", "col", "color", "colour", "fg", "fill", "group", "hjust", "label", "linetype", "lower", "lty", "lwd", "max", "middle", "min", "order", "pch", "radius", "sample", "shape", "size", "srt", "upper", "vjust", "weight", "width", "x", "xend", "xmax", "xmin", "xintercept", "y", "yend", "ymax", "ymin", "yintercept", "z")
  argArray <- as.list(match.call())
  aesthetics <- plyr::compact(argArray[.all_aesthetics])  
  class(aesthetics) <- "uneval"

  obj <- ggplot(data, aesthetics)
  
  data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
  attr(obj, "NAME") <- data

  if(geom == "point") {
    obj <- obj + geom_point()
  } else if(geom == "line") {
    obj <- obj + geom_line()
  } else if(geom == "bar") {
    obj <- obj + geom_bar()
  } else if(geom == "boxplot") {
    obj <- obj + geom_boxplot()
  }
    
  ggplot_RIGHT(obj)
  
} # function CreateAttr_qplot
