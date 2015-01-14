## runServer.R

#' @title shiny server-offloading
#' 
#' @description Function to create server-offloading graph.
#' 
#' @param expr a formula to draw server-offloading graph and return result of formula.
#' 
#' @seealso \code{\link{shiny}}
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <-  RIGHT({plot(conc ~ Time, Theoph, type="p", color = Subject)
#'                loessArray <- runServer({obj <- loess(conc ~ Time, data = Theoph)
#'                    xRange <- range(Theoph$Time)
#'                    simArray <- data.frame(Time = seq(xRange[1], xRange[2], length.out = 132))
#'                    simArray$conc <- predict(obj, newdata = simArray)
#'                    return(simArray)})
#'                lines(conc ~ Time, loessArray)})
#' print(obj)
#' }
runServer <- function(expr={}) {
  
  # Flag on about sever-offloading
  .RIGHT$flagServer <- TRUE
  
  # Count sever-offloading graphs
  .RIGHT$numServer <- .RIGHT$numServer + 1
  
  # Copy user's code with special class name
  .RIGHT$exprArray <- c(.RIGHT$exprArray, structure(substitute(expr), class = paste0("RIGHTServer", .RIGHT$numServer)))  
  
  return(structure(eval(substitute(expr)), class = paste0("RIGHTServer", .RIGHT$numServer)))
  
} # function runServer
